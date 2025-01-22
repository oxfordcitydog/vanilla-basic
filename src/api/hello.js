module.exports = async function (context, req) {
    context.res = {
        // HTTP status code
        status: 200,
        // Response body
        body: { message: "Hello, this is your API!" },
    };
};
