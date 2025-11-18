

router.get("/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const question = question.find(q => q.id === id);
        if (question) {
            res.json(question);
        } else {
            res.status(404).json({ message: "Question not found" });
        }
});