exports.createLesson = (req, res) => {
	res.json({
		parentCourse: 1,
		name: "HTML",
		desc: "This is the HTML course",
		urls: ["www.htlm.com"],
		isCompleted: false,
	});
};
