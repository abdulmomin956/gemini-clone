import { createContext, useEffect, useRef, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = props => {
  const [input, setInput] = useState('')
  const [allChats, setAllChats] = useState([])
  const [currChat, setCurrChat] = useState(0)
  const [isNew, setIsNew] = useState(true)
  const [recentPrompt, setRecentPrompt] = useState('')
  const [prevPrompts, setPrevPrompts] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resultData, setResultData] = useState("")
  const timers = useRef([]);

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData(prev => prev + nextWord)
    }, 10 * index)
  }

  useEffect(() => {
    return () => {
      timers.current.forEach(timerId => clearTimeout(timerId));
      timers.current = [];
    };
  }, []);

  const newChat = () => {
    setLoading(false)
    setShowResult(false)
  }


  const onSent = async (prompt) => {
    setResultData("")
    setLoading(true)
    setShowResult(true)
    let response
    if (prompt !== undefined) {
      setRecentPrompt(prompt)
      response = await run(prompt)
    } else {
      setRecentPrompt(input)
      setPrevPrompts(prev => [...prev, input])
      response = await run(input)
      if (isNew) {
        setAllChats(prev => [...prev, [{ prompt: input, result: response }]])
        setIsNew(false)
      } else {
        debugger
        setAllChats(prev =>
          prev.map((innerArray, i) =>
            i === currChat ? [...innerArray, { prompt: input, result: response }] : innerArray
          )
        )
      }
    }
    console.log(response)
    // setResultData(response)
    let newResponseArray = response.split(" ")
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i]
      delayPara(i, nextWord + " ")
    }
    setLoading(false)
    setInput("")
  }



  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    recentPrompt,
    setRecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    allChats,
    setAllChats,
    isNew,
    setIsNew
  }

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider;