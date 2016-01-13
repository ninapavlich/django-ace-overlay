# django-ace-overlay
This is an implementation of the Ace Editor for Django, which uses an overlay to edit code instead of editing it directly. This is particularly useful when you are using a code editor in conjunction with inlines -- which gives you a scrolling window inside a scrolling window, enough to drive a person insane.

![CKEditor Dialog](https://raw.github.com/ninapavlich/django-ace-overlay/master/docs/screenshots/overlay.png)

By default, all code is visible in the admin as read-only text. Clicking the text opens the editor overlay.
![CKEditor Dialog](https://raw.github.com/ninapavlich/django-ace-overlay/master/docs/screenshots/readonly.png)


## Example Usage
```
    $ pip install django-ace-overlay
```

```
    #settings.py

    INSTALLED_APPS = (
        ...
        ace_overlay,
        ...
    )
```    


```python

    #forms.py

    from django import forms
	from ace_overlay.widgets import AceOverlayWidget
	from .models import Template


	class TemplateAdminForm(forms.ModelForm):

	    custom_template = forms.CharField(widget=AceOverlayWidget(mode='html', wordwrap=False, theme='twilight', width="850px", height="800px", showprintmargin=True), required=False)
	    
	    class Meta:
	    	model = Template

``` 
