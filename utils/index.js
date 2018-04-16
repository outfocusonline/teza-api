// λ utils until I need a full fledged functional library

const identity = x => x;
const doesExist = x => x ? true : false;
const justTrue = () => true;
const justNull = () => null;

module.exports = {
	identity,
	doesExist,
	justTrue,
	justNull
}