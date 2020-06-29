import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import  { Table }  from "../../src/Components/Table";

const defaultProps = {
	data: [{
		points: 123,
		title: "news data 1",
		author: "random",
		objectID: 1234,
		url: "ab.com",
		num_comments: 123,
		voted: false

	}],
	headers: ["header1", "header2"],
	updateElementAtIndex: () => {},
	hideElement: () => {}
}

describe("<Table />", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(
			<Table {...defaultProps}/>
		);
	});

	it("renders without crashing and updates the state", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
	});
});
