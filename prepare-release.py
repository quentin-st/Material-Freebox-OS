#!/usr/bin/python3
# -*- coding: utf-8 -*-

import argparse
import sys
import os
import shutil
import json


release_dir = 'release/'
base_dir = os.path.dirname(os.path.realpath(__file__))
flavours = ['Chrome', 'Firefox']
files_generic = [
    'data/css/style.css',
    'data/img/*',
    'data/js/script.js',
    'data/js/injector.js',
    'manifest.json'
]
files_flavours = {
    'Chrome': [],
    'Firefox': []
}
manifest = 'manifest.json'

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
if not os.path.isdir(release_dir):
    print('Creating output dir')
    os.makedirs(release_dir)

# Open manifest & read version name
manifest_json = open(manifest)
version = json.load(manifest_json)['version']
output_dir_name = 'Material-Freebox-OS-{}-{}'.format(flavour, version)
output_dir = os.path.join(release_dir, output_dir_name)

# Expand files list (js/* => [js/script.js, js/injector.js]
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

# TODO zip the directory & delete it
