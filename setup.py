from setuptools import setup

setup(
    name='django-ace-overlay',
    version='0.8.0',
    author='Nina Pavlich',
    author_email='nina@ninalp.com',
    url='https://github.com/ninapavlich/django-ace-overlay',
    license="MIT",
    description='Ace editor for Django admin',
    keywords=['libraries', 'web development',
              'cms', 'django', 'code-editor', 'admin'],
    include_package_data=True,
    packages=['ace_overlay'],
    classifiers=[
        'Development Status :: 4 - Beta',
        'Environment :: Web Environment',
        'Framework :: Django',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Natural Language :: English',
        'Operating System :: OS Independent',
        'Programming Language :: Python'
    ]
)
