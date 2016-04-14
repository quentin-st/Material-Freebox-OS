#!/usr/bin/python3
# -*- coding: utf-8 -*-

import sys
import os
import shutil
import json

output_dir = 'release/'
manifest = 'manifest.json'
files = [
    'manifest.json',
    '3d/*',
    'css/style.css',
    'img/*',
    'js/*'
]

# Create output dir if necessary
if not os.path.isdir(output_dir):
    print('Creating output dir')
    os.makedirs(output_dir)

# Read manifest & read version name
if not os.path.isfile(manifest):
    print('Missing manifest file ({})'.format(manifest))

manifest_json = open(manifest)
version = json.load(manifest_json)['version']
output_dir = os.path.join(output_dir, 'Material-Freebox-OS-{}'.format(version))

# Expand files list (js/* => [js/script.js, js/injecter.js]
expanded_files = []
for file in files:
    if file.endswith('*'):
        real_name = file[:-1]
        expanded_files.extend(
            [os.path.join(dp, f) for dp, dn, filenames in os.walk(real_name) for f in filenames]
        )
    else:
        expanded_files.append(file)

# Copy these!
print('Copying resources in {}...'.format(output_dir))
for file in expanded_files:
    destination = os.path.join(output_dir, file)
    destination_dirs = os.path.dirname(destination)

    if not os.path.isdir(destination_dirs):
        os.makedirs(destination_dirs)

    shutil.copy(file, destination)
    print('Copied {}'.format(file, destination))
