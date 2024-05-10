export const testController = (req,res) => {
    res.status(200).send({
    message: "testController routes",
    success: true,
    });
};