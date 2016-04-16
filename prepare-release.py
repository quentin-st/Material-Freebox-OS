#!/usr/bin/python3
# -*- coding: utf-8 -*-

import argparse
import sys
import os
import shutil
import json


def get_version(flavour):
    manifest = manifests[flavour]

    # Parse file depending on flavour
    if flavour == 'chrome':
        manifest_json = open(manifest)
        return json.load(manifest_json)['version']
    else:
        return None

output_dir = 'release/'
flavours = ['chrome']
files_generic = [
    'manifest.json',
    '3d/*',
    'css/style.css',
    'img/*',
    'js/*'
]
files_flavours = {
    'chrome': [
        'manifest.json'
    ]
}
manifests = {
    'chrome': 'manifest.json'
}

parser = argparse.ArgumentParser(description='Prepare release packages for different flavours')
parser.add_argument('--flavour')
args = parser.parse_args()
flavour = args.flavour

if flavour is None:
    print('Please specify a flavour using --flavour')
    sys.exit(1)
elif flavour not in flavours:
    print('Unknown flavour, exiting')
    sys.exit(1)

# Create output dir if necessary
if not os.path.isdir(output_dir):
    print('Creating output dir')
    os.makedirs(output_dir)

# Read manifest & read version name
version = get_version(flavour)
output_dir = os.path.join(output_dir, 'Material-Freebox-OS-{}-{}'.format(flavour, version))

# Expand files list (js/* => [js/script.js, js/injecter.js]
expanded_files = []
files = files_generic + files_flavours[flavour]
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
