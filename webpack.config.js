const path = require("path")
const HTMLWebpackPlugin =require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const fs = require('fs');

const isDev = process.env.NODE_ENV === "development"
const isProd = !isDev
console.log(isDev)



const PAGES_DIR = path.resolve(__dirname, 'src/pages');
const PAGES = fs.readdirSync(PAGES_DIR);

const optimization = () => {
    const config = {
        splitChunks:{
            chunks: "all"
        }
    }
    if (isProd){
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
        return config
    }
    return{
        splitChunks:{
            chunks: "all"
        }
    }
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`


module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: {
        main:["@babel/polyfill", "./index.js"]
    },
    output: {
        filename: filename("js"),
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".js",".png",".json"],
        alias: {
            "@": path.resolve(__dirname, "src"),
            blocks: path.resolve(__dirname, 'src/blocks'),
        }
    },
    optimization: optimization(),
    devtool: isProd ? false : "source-map",
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 4200
    },
    plugins: [
        // new HTMLWebpackPlugin({
        //     template: "./colors-and-types.html",
        //         minify: {
        //         collapseWhitespace: isProd
        //         }
        //     }
        // ),
        new CleanWebpackPlugin(),
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, "src/favicon.ico"),
        //             to: path.resolve(__dirname, "dist")
        //         },
        //     ],
        // }),
        new MiniCssExtractPlugin({
            filename: filename("css")
        }),
        ...PAGES.map((page) => new HTMLWebpackPlugin({
            filename: `${page}.html`,
            template: `${PAGES_DIR}/${page}/${page}.pug`,
            minify: {
                collapseWhitespace: isProd
            }
        }))

    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ["file-loader"]
            },
            {
                test: /\.(ttf|woff2|eot)$/,
                use: ["file-loader"]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ["@babel/plugin-proposal-class-properties"]
                    }
                }
            }

        ]
    }
}

