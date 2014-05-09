# zenpage-themes

Theme collections for zenpage

## Install

```bash
mkdir ~/.zenpage && cd ~/.zenpage
git clone https://github.com/ddliu/zenpage-themes.git themes
```

## Make Theme

A perticular theme structure looks like this:

```
theme_name/
├── layout.html
├── logo.png
├── theme.css
├── theme.js
└── theme.json
```

### Layout

layout.html is the layout template of the theme which is written in Mustache.

### Template Variables

- url.theme: Url to current theme, you can use it to locate js/css files.
- meta: Metadata of currently rendered file.
- TOC: Table of contents
- config


### theme.json

theme.json contains information of the theme, here is an example:

```json
{
    "name": "simple",
    "description": "Simple theme",
    "version": "0.1.0",
    "author": {
        "name": "dong",
        "email": "ddliuhb@gmail.com"
    },
    "license": "MIT"
}
```

## Build

```bash
sudo apt-get install phantomjs # generate screenshot
go get github.com/ddliu/go-zenpage/zenpage # not ready
npm install -g gulp
bower install
npm install
gulp
```