// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./PhatRollupAnchor.sol";

contract Fighter is PhatRollupAnchor, Ownable {
    event ResponseReceived(uint reqId, address pair, uint256 value);
    event ErrorReceived(uint reqId, address pair, uint256 errno);
    event Attack(address pair, uint256 value);
    event Winner(address pair);
    event Loser(address pair);
    event Draws(address pair,address pair2);

    uint constant TYPE_RESPONSE = 0;
    uint constant TYPE_ERROR = 2;

    mapping(uint => address) private requests;
    mapping(uint => uint[]) private whofight;
    mapping(uint => mapping(address=>uint)) private whowin;
    mapping(address => uint) private winning;
    mapping(address => uint) private losing;
    mapping(address => uint) private draw;
    mapping(address => string) private fighters;

    uint private nextRequest = 1;

    constructor(address phatAttestor) {
        _grantRole(PhatRollupAnchor.ATTESTOR_ROLE, phatAttestor);
    }
function getWin(address _address) public view returns(uint) {
        return winning[_address];
    }
function getLose(address _address) public view returns(uint) {
        return losing[_address];
    }
function getDraw(address _address) public view returns(uint) {
        return draw[_address];
    }
    function setAttestor(address phatAttestor) public onlyOwner {
        _grantRole(PhatRollupAnchor.ATTESTOR_ROLE, phatAttestor);
    }

    function request(address enemy) public {
        uint id = _createRequest(msg.sender);
        uint id2 = _createRequest(enemy);
        _addFight(id, id2);
    }

    function _createRequest(address fighter) private returns (uint) {
        uint id = nextRequest++;
        requests[id] = fighter;
        _pushMessage(abi.encode(id, fighters[fighter]));
        return id;
    }

    function _addFight(uint id1, uint id2) private {
        whofight[id1].push(id1);
        whofight[id1].push(id2);
        whofight[id2].push(id1);
        whofight[id2].push(id2);
    }

    function _onMessageReceived(bytes calldata action) internal override {
        require(action.length == 32 * 3, "cannot parse action");
        (uint respType, uint id, uint256 data) = abi.decode(
            action,
            (uint, uint, uint256)
        );
        whowin[id][requests[id]]=data;
        if (respType == TYPE_RESPONSE) {
            emit ResponseReceived(id, requests[id], data);
            emit Attack(requests[id], data);
            _checkWinner(id);
        } else if (respType == TYPE_ERROR) {
            emit ErrorReceived(id, requests[id], data);
            _declareDraw(id);
        }
    }

    function _checkWinner(uint id) private {
        if(whowin[whofight[id][0]][requests[whofight[id][0]]] > 0 && whowin[whofight[id][1]][requests[whofight[id][1]]] > 0){
            if(whowin[whofight[id][0]][requests[whofight[id][0]]]>whowin[whofight[id][1]][requests[whofight[id][1]]]){
                _declareResult(whofight[id][0], whofight[id][1]);
            }else if(whowin[whofight[id][0]][requests[whofight[id][0]]]<whowin[whofight[id][1]][requests[whofight[id][1]]]){
                _declareResult(whofight[id][1], whofight[id][0]);
            }else{
                _declareDraw(id);
            }
        }
    }

    function _declareResult(uint winnerId, uint loserId) private {
        winning[requests[winnerId]]+=1;
        losing[requests[loserId]]+=1;
        emit Winner(requests[winnerId]);
        emit Loser(requests[loserId]);
    }

    function _declareDraw(uint id) private {
        draw[requests[whofight[id][1]]]+=1;
        draw[requests[whofight[id][0]]]+=1;
        emit Draws(requests[whofight[id][1]],requests[whofight[id][0]]);
    }

    function setFighter(string memory _str) public {
        fighters[msg.sender] = _str;
    }

    function getFighter(address _address) public view returns(string memory) {
        return fighters[_address];
    }
}