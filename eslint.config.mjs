module.exports = [
  {
    script: "server.js",
    name: "app",
    exec_mode: "cluster",
    instances: 3,
    env: {
      NODE_ENV: "production",
      HOSTNAME: "0.0.0.0",
      PORT: 3000,
    },
  },
];
