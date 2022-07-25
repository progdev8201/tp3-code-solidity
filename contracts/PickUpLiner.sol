// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

contract PickUpLiner {
    event PickUpLineAdded(PickUpLine pickUpLine);

    PickUpLine[] private pickUpLines;
    mapping(address => uint256[]) private _userToPickUpLine;
    address public owner;
    uint256 public completedPickUpLinesAmount = 0;

    struct PickUpLine {
        uint256 id;
        string line;
    }

    constructor() {
        owner = msg.sender;
    }

    function makeDonationToOwner() public payable {
        payable(owner).transfer(msg.value);
    }

    function setAmountOfPickUpLine(uint256 _completedPickUpLinesAmount) public onlyOwner {
        completedPickUpLinesAmount = _completedPickUpLinesAmount;
    }

    /**
     * @dev Will add pick up line to pick up line array
     */
    function addPickUpLine(PickUpLine memory _pickUpLine) public onlyOwner {
        _pickUpLine.id = pickUpLines.length;
        pickUpLines.push(_pickUpLine);

        emit PickUpLineAdded(_pickUpLine);
    }

    function completePickUpLine(uint256 _pickUpLineId) pickUpLineExist(_pickUpLineId) notCompletedBefore(_pickUpLineId) public {
        _userToPickUpLine[msg.sender].push(_pickUpLineId);
        completedPickUpLinesAmount++;
    }

    // getters

    function getUserPickUpLineArray(address _user) public view returns(uint256[] memory) {
      return _userToPickUpLine[_user];
    }

    function getPickUpLine(uint256 _index) public view returns (PickUpLine memory) {
        return pickUpLines[_index];
    }

    function getPickUpLineLength() public view returns (uint256) {
        return pickUpLines.length;
    }

    // PRIVATE METHODS

    /**
     * @return true if `msg.sender` is the owner of the contract.
     */
    function _isOwner() private view returns (bool) {
        return msg.sender == owner;
    }

    function _getPickUpLineById(uint256 _pickUpLineId) private view returns (PickUpLine memory) {
        return pickUpLines[_pickUpLineId - 1];
    }

    function _isCompleted(address _sender, uint256 _pickUpLineId) private view returns (bool) {
        for (uint256 index = 0; index < _userToPickUpLine[_sender].length; index++) {
            if (_userToPickUpLine[_sender][index] == _pickUpLineId) {
                return true;
            }
        }
        return false;
    }

    // MODIFIERS

    /**
     * @dev Will throw if not called by owner.
     */
    modifier onlyOwner() {
        require(_isOwner(), 'You\'re not the owner');
        _;
    }

    // add private methods for that then simply call the private method in require
    modifier notCompletedBefore(uint256 _pickUpLineId) {
        require(!_isCompleted(msg.sender, _pickUpLineId), 'Contract is already completed');
        _;
    }

    modifier pickUpLineExist(uint256 _pickUpLineId) {
        require(_pickUpLineId <= pickUpLines.length, 'Pick up line doesn\'t exist');
        _;
    }
}
