{/* NOTE: JSX comment syntax */}

// NOTE: Example JSON data for testing
var data = [
	{id: 1, author: "Netko Nesta", text: "Test komentar"},
	{id: 2, author: "Booga Boo", text: "Test *komentar* za markdown"}
];

//
var CommentBox = React.createClass({
	render: function() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.props.data} />
				<CommentForm />
				<LikeButton />
			</div>
		);
	}
});

var CommentList = React.createClass({
	render: function() {
		var commentNodes = this.props.data.map(function(comment) {
			return (
			<Comment author={comment.author} key={comment.id}>
				{comment.text}
			</Comment>
			);
		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
});

var CommentForm = React.createClass({
	render: function() {
		return (
			<div className="commentForm">
				I'm a CommentForm!
			</div>
		);
	}
});

var Comment = React.createClass({
	rawMarkup: function() {
		var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		return { __html: rawMarkup };
	},

	render: function() {
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup()} />
			</div>
		);
	}
});

var LikeButton = React.createClass({
	getInitialState: function() {
		return {liked: false};
	},
	handleClick: function(event) {
		this.setState({liked: !this.state.liked});
	},
	render: function() {
		var text = this.state.liked ? 'like' : 'haven\'t liked';
		var likedornot = this.state.liked ? "liked" : "notliked";
		return (
		<p className="clickable" onClick={this.handleClick}>
			<div className={likedornot}>You {text} this comment. Click to toggle.</div>
		</p>
		);
	}
});

ReactDOM.render(
	<CommentBox data={data} />,
	document.getElementById('content')
);
