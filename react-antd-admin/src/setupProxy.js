const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/loca', 
        createProxyMiddleware({
            target: 'http://localhost:3030',
            changeOrigin: true,
            pathRewrite: {
                '^/loca': '/api' // 替换路径
            },
            onError: (err, req, res) => {
                console.error('代理错误:', err); // 打印代理层错误
            }
        })
    );
    app.use(
        '/picture', 
        createProxyMiddleware({
            target: 'http://localhost:3030',
            changeOrigin: true,
            onError: (err, req, res) => {
                console.error('代理错误:', err); // 打印代理层错误
            }
        })
    )
};