#!/usr/bin/python3
# -*- coding: utf-8 -*-
#
# This script allows us to generate static PNG icons from the SVG version.
# It on svgexport npm package: https://github.com/shakiba/svgexport
#

import os
import json

manifest = 'manifest.json'
destination = 'data/img'

# Open manifest & read required icons dimensions
with open(manifest) as manifest_file:
    manifest_json = json.load(manifest_file)

icons_dicts = [
    manifest_json['icons'],
    manifest_json['browser_action']['default_icon']
]

dimensions = []
for icons_dict in icons_dicts:
    for key in icons_dict.keys():
        if key not in dimensions:
            dimensions.append(key)

# Generate!
os.chdir(destination)
for dimension in dimensions:
    icon_name = 'icon-{}x{}.png'.format(dimension, dimension)
    print('\tGenerating {}'.format(icon_name))

    command = "svgexport {input} {output} {width}:{height}".format(
        input='icon.svg',
        output=icon_name,
        width=dimension,
        height=dimension
    )

    print(command)
    os.system(command)
