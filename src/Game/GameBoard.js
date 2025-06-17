import React, { useEffect, useState } from 'react'
import Card from './Card'
import Data from  './data'

const GameBoard = () => {
	const [moves,setMoves]=useState(0)
	const [firstCard,setFirstCard]=useState(null)
	const [secondCard,setSecondCard]=useState(null)
    const [win,setWin]=useState(0) 
	const [cardsArray,setCardsArray]=useState([]) 
	const [stopFlip,setStopFlip]=useState(false)


	const NewGame=()=>{
		setTimeout(() => {
			
		
	 const	RandomNumberArray=Data.sort(()=>0.5-Math.random())
		setCardsArray(RandomNumberArray)
		setFirstCard(null)
		setSecondCard(null)
		setStopFlip(false)
		setWin(0)
		setMoves(0)
		},1200)
	}
	useEffect(()=>{
		NewGame()
	},[])

	const handleSelectedCards=(item)=>{
		if(firstCard !== null){
			setSecondCard(item)
		}else{
			setFirstCard(item)
		}
	}

	useEffect(()=>{
		if(firstCard && secondCard){
			setStopFlip(true)
			if(firstCard.name===secondCard.name){
				setCardsArray((prevArray)=>(
					prevArray.map((unit)=>{
						if(unit.name===firstCard.name){
							return {...unit, matched:true}
						}
						else {return unit}
					}
						

					)
				))
				removeSelection()
				
			}
			else {
				setTimeout(() => {
					removeSelection()
				},1000);
			}
		}
	},[firstCard,secondCard])

	const removeSelection=()=>{
		setFirstCard(null)
		setSecondCard(null)
		setStopFlip(false)
		setMoves((prevValue)=>prevValue + 1)

	}

  return (
	<div className='container'>
		<div className='header'>
			<h2>Memory Game</h2>
		</div>
		<div className='board'>
			{ cardsArray.map((item)=>(
				<Card 
				       item={item}
					   key={item.id}
					   handleSelectedCards={handleSelectedCards}
					   toggled={
						item===firstCard ||
						item===secondCard ||
						item.matched ===true
					   }
					   stopflip={stopFlip}/>
			)

			)

			}


		</div>
		{ win!==6 ?(
			<div className='comments'> moves : {moves}</div>
		):(
			<div className='comments'> you win to {moves}  moves</div>
		)

		}
		<button className='button' onClick={NewGame}> New Game</button>
	  
	</div>
  )
}

export default GameBoard
