require('dotenv').config()
const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
const enableAnalyser = process.env.ANALYZE === 'true'
const { WebpackBundleSizeAnalyzerPlugin } = require('webpack-bundle-size-analyzer')
const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: enableAnalyser })
const path = require('path')

const config = {
    distDir: 'dist',
    webpack : (config, { isServer }) => {
        if(process.env.ANALYZE){
            config.plugins.push(new WebpackBundleSizeAnalyzerPlugin('stats.txt'))
        }

        if (!isServer) {
            config.node = {
                fs: 'empty'
            }
        }
        config.module.rules.push(
            {
                test: /\.(ico|svg|png|jpe?g|gif|eot|ttf|woff|woff2)$/,
                use: [
                    'file-loader',
                    'image-webpack-loader',
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'images/[hash]-[name].[ext]',
                            limit: 100000
                        }
                    }
                ]
            }
        )
        return config
    }
}

const configWithPlugins = withPlugins([
    [withImages, {
        exclude: path.resolve(__dirname, 'public/images/svg')
    }]
], config)

module.exports = enableAnalyser ? withBundleAnalyzer(configWithPlugins) : configWithPlugins
