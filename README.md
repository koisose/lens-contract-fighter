# Lens Profile fighter

## Video Demo

https://www.youtube.com/watch?v=Fw6y3oatblE

Lens Consumer Contract

https://mumbai.polygonscan.com/address/0x9Bd7AFde187a8A21EABE0D71658892EAB6f9aeee

How to deploy contract

```
yarn deploy --network polygonMumbai
```

How to deploy frontend

```
cd packages/nextjs
vercel .
```

Action offchain rollup address

```
0x89e6979880f43cc42a1b2ee915895c61e123fc87d687ff88b0f18d7832f1b508
```

Attestor Address

```
0x2e725ef367550116f5d337faec42bbc14b867a9b
```

Demo

https://nextjs-koisose.vercel.app/

# How this work

So this game is very simple, firstly, you need to choose one lens profile, lets say i pick `lensprotocol` lens profile here i just need to click `USE THIS AS MY FIGHTER`:

![image](https://github.com/koisose/lens-contract-fighter/assets/17805677/7be38853-53a2-477a-8fc6-769e62a7a793)

Don't forget to wait until it says `Successfully set <username> as your fighter`, as you can see my lens fighter has `3341` Follower right so this game is a game of luck, its kinda like you throw a dice
with your friend but the dice is from 0 to lens profile follower count, so if the follower of my fighter is `3341` then i can get random number between 0 to `3341`, this can be done by using js 
transformation method in Phat bricks ui:

![image](https://github.com/koisose/lens-contract-fighter/assets/17805677/bc3995ba-b0ca-4a10-8731-3a2826f8b74a)

So everytime i click fight here:

![image](https://github.com/koisose/lens-contract-fighter/assets/17805677/5bf81fe1-26e9-46c2-bd8a-98cf7ccf9e07)

The smart contract will send request to offchain rollup, then will send back to us the result between fight this is the snippet of the smart contract:

https://mumbai.polygonscan.com/tx/0xcff22efbf44acb09df9d204cbdd66a126353cfdce601fe60746dd5661b84c26f#eventlog

![image](https://github.com/koisose/lens-contract-fighter/assets/17805677/280f927b-41b1-43f3-8744-3a5c887dfe16)

as you can see there is an event called `Winner` it will check whos the winner based on who has the bigger number calculated via the smart contract you can see the logic here:

https://github.com/koisose/lens-contract-fighter/blob/main/packages/hardhat/contracts/Fighter.sol#L80

there is also event `Attack` to catch what number is picked by opponent and us this is what happen when we click fight button:

![image](https://github.com/koisose/lens-contract-fighter/assets/17805677/d7006c74-5f27-4536-bce6-9c6a47758447)

You can also see record in the `My Fighter` tab

![image](https://github.com/koisose/lens-contract-fighter/assets/17805677/3afed44b-905d-4981-89b2-9f26f3f5e7cf)






