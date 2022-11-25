import {OctopusCard} from "./OctopusCard";
const Story = {
  title: "Examples/OctopusCard",
  component: OctopusCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

const Template = args => <OctopusCard {...args} />;

export const Octy = Template.bind({});
Octy.args = {
  octopus: {
    name: "Octy",
    color: "yellow",
    age: 4,
  },
};
export const Bruce = Template.bind({});
Bruce.args = {
  octopus: {
    name: "Bruce",
    color: "green",
    age: 3,
  },
};
export const Noora = Template.bind({});
Noora.args = {
  octopus: {
    name: "Noora",
    color: "hotpink",
    age: 5,
  },
};

export default Story;
