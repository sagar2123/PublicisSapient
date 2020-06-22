import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { Container } from "../../src/Components/Container";

const defaultProps = {
    match: {
        params: {
            pageId: 1
        }
    }
}

describe("<Container />", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(
			<Container {...defaultProps}/>
		);
	});

	it("renders without crashing and updates the state", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
	});
});
