import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { HackerNews } from "../../src/Containers/HackerNews";

const defaultProps = {
    match: {
        params: {
            pageId: 1
        }
    }
}

describe("<HackerNews />", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(
			<HackerNews {...defaultProps}/>
		);
	});

	it("renders without crashing and updates the state", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
	});
});
