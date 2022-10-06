module.exports = {
    apps: [
      {
        name: "alumni-backend-skct",
        script: "./index.js",
        instances: 1,
        exec_mode: "fork",
        autorestart: true,
        watch: false,
        max_memory_restart: "1G",
        env: {
          NODE_ENV: "development"
        },
        env_production: {
          NODE_ENV: "production"
        }
      }
    ],
  
    deploy: {
    //   prod: {
    //     user: "",
    //     host: "",
    //     ref: "origin/master",
    //     repo: "",
    //     path: "",
    //     "post-deploy": `npm install && npm run db:deploy && npx prisma generate && pm2 reload ecosystem.config.js --env production`
    //   }
    }
  };
  