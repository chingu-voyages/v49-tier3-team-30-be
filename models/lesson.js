// I followed the mozilla developer documentation for using mongoose
// URL: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lessonSchema = new Schema({
	parentCourse: { type: Schema.Types.ObjectId, ref: "Course" },
	name: {
		type: String,
		required: true,
	},
	desc: {
		type: String,
	},
	urls: [
		{
			type: String,
		},
	],
	isCompleted: {
		type: Boolean,
		default: false,
	},
	nodeData: {
		any: {
			id: 0,
			position: { x: 0, y: 0 },
			label: "CSS",
			sourcePosition: 0,
			targetPosition: 0,
		},
	},
	nodeEdges: {
		any: {
			id: "e1-2",
			source: "1",
			target: "2",
			markerEnd: {
				type: MarkerType.ArrowClosed,
				width: 10,
				height: 10,
				color: "black",
			},
			style: {
				strokeWidth: 2,
				stroke: "black",
			},
		},
	},
});

const Lesson = mongoose.model("Lesson", lessonSchema);
