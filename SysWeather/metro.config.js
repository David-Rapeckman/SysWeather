// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const config = getDefaultConfig(__dirname);

// Bloqueia tudo que vier de react-native-maps quando estiver rodando no bundler (web)
config.resolver.blockList = exclusionList([/react-native-maps\/.*/]);

module.exports = config;
