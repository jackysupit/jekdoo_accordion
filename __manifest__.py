# -*- coding: utf-8 -*-
{
    'name': 'Accordion Widget - Jekdoo',
    'summary': 'widget to show a one2many list as an accordion',
    'version': '16.001',
    'category': 'Hidden',
    'author': 'jeki',
    'maintainer': 'jeki',
    'website':  '',
    'license': 'AGPL-3',
    'depends': [
        'base', 
    ],
    'data': [
    ],
    'application': False,
    'installable': True,
    'assets': {
        'web.assets_backend': [
            '/jek_accordion/static/src/widgets/**/*.xml',
            '/jek_accordion/static/src/widgets/**/*.js',
        ],
    },
}