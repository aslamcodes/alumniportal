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
          NODE_ENV: "development",
          EMAIL_USERNAME : "alumniportal@skct.edu.in",
          EMAIL_PASSWORD : "skctalumni",
          FROM_EMAIL : "alumniportal@skct.edu.in",
          EMAIL_HOST : "smtp.gmail.com",
          URI : "mongodb://localhost:27017/alumni-portal-skct",
          JWT_TOKEN_SECRET : "skct-secret-for-jwt-token-wont-change-123h4wkjfbwredlsf"

        },
        env_production: {
          NODE_ENV: "production",
          EMAIL_USERNAME : "alumniportal@skct.edu.in",
          EMAIL_PASSWORD : "skctalumni",
          FROM_EMAIL : "alumniportal@skct.edu.in",
          EMAIL_HOST : "smtp.gmail.com",
          URI : "mongodb://localhost:27017/alumni-portal-skct",
          JWT_TOKEN_SECRET : "skct-secret-for-jwt-token-wont-change-123h4wkjfbwredlsf"
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
  