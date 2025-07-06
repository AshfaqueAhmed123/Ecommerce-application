export const handleNotFound = (req,res) => {
    res.status(404).send("<h1>OOps! This page does not exists.")
}