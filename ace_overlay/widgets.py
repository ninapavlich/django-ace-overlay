# -*- coding=utf-8 -*-
from __future__ import unicode_literals

from django import forms
from django.utils.html import escape
from django.utils.safestring import mark_safe

try:
    from django.forms.utils import flatatt
except ImportError:
    from django.forms.util import flatatt


class AceOverlayWidget(forms.Textarea):
    def __init__(self, mode=None, theme=None, wordwrap=False, width="500px", height="300px", showprintmargin=True, *args, **kwargs):
        self.mode = mode
        self.theme = theme
        self.wordwrap = wordwrap
        self.width = width
        self.height = height
        self.showprintmargin = showprintmargin
        super(AceOverlayWidget, self).__init__(*args, **kwargs)

    @property
    def media(self):
        js = [
            "ace_overlay/js_beautify/js_beautify.js",
            "ace_overlay/underscore/underscore.js",
            "ace_overlay/ace/ace.js",
            "ace_overlay/ace/ext-emmet.js",
            "ace_overlay/widget.js",
        ]
        if self.mode:
            js.append("ace_overlay/ace/mode-%s.js" % self.mode)
        if self.theme:
            js.append("ace_overlay/ace/theme-%s.js" % self.theme)
        css = {
            "screen": ["ace_overlay/widget.css"],
        }
        return forms.Media(js=js, css=css)

    def render(self, name, value, attrs=None, **kwargs):
        attrs = attrs or {}

        ace_attrs = {
            "class": "django-ace-widget loading",
            "style": "width:%s; height:%s" % (self.width, self.height)
        }
        if self.mode:
            ace_attrs["data-mode"] = self.mode
        if self.theme:
            ace_attrs["data-theme"] = self.theme
        if self.wordwrap:
            ace_attrs["data-wordwrap"] = "true"
        ace_attrs["data-showprintmargin"] = "true" if self.showprintmargin else "false"

        textarea = super(AceOverlayWidget, self).render(name, value, attrs, **kwargs)

        html = "<div class='ace-overlay'>\
            <div class='readonly-container'>\
                <div class='input-container'>%s</div>\
                <div class='code-container'>%s</div>\
                <a href='#' class='edit'></a>\
            </div>\
            <div class='overlay-container'>\
                <a href='#' class='backdrop' title='Cancel'></a>\
                <div class='overlay'>\
                    <div class='header'>\
                        <div class='title'>Editing...</div>\
                        <div class='buttons'>\
                            <a href='#' class='beautify' title='Beautify'><span>Beautify<span></a>\
                            <a href='#' class='align left' title='Align Left'><span></span></a>\
                            <a href='#' class='align right' title='Align Right'><span></span></a>\
                            <a href='#' class='align top' title='Align Top'><span></span></a>\
                            <a href='#' class='align bottom' title='Align Bottom'><span></span></a>\
                            <a href='#' class='cancel'>Cancel</a><a href='#' class='save'>Close</a>\
                        </div>\
                    </div>\
                    <div class='editor-container'>\
                        <div%s></div>\
                    </div>\
                </div>\
            </div>\
        </div>" % (textarea, escape(value), flatatt(ace_attrs))

        return mark_safe(html)
