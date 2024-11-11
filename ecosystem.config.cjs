module.exports = {
    apps: [
        {
            namespace: "RJA TIX",
            name: "web",
            script: "npm run start",
            cwd: "./web",
            watch: ".",
        },
        {
            namespace: "RJA TIX",
            name: "server",
            script: "npm run start",
            cwd: "./server",
            watch: ".",
        },
    ],
};
