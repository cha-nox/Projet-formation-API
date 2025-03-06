module.exports = {
    apps: [{
        name: "Projet-formation-API",
        script: "./dist/index.js",
        watch: true,
        instances: 1,
        autorestart: true,
        env: {
            NODE_ENV: "development"
        },
        env_production: {
            NODE_ENV: "production"
        }
    }]
};