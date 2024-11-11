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
            name: "api",
            script: "npm run start",
            cwd: "./api",
            watch: ".",
        },
    ],
};
