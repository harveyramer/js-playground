import { sortExamples } from "./sorting/index.js";
const runExamples = async () => {
    const sortResult = await sortExamples();
    console.log(JSON.stringify(sortResult, null, 2));
};
runExamples();
