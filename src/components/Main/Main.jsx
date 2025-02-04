import React, { Fragment, useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import Markdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierForestLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'

const Main = () => {
  const { prevPrompts,
    setPrevPrompts,
    onSent,
    recentPrompt,
    setRecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    allChats } = useContext(Context)


  console.log(allChats)
  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? <>
          <div className="greet">
            <p><span>Hello, Dev.</span></p>
            <p>How can I help you today?</p>
          </div>
          <div className="cards">
            <div className="card">
              <p>Suggest beautiful places to see an upcoming road trip</p>
              <img src={assets.compass_icon} alt="" />
            </div>
            <div className="card">
              <p>Briefly summarize the concept: urban planning</p>
              <img src={assets.bulb_icon} alt="" />
            </div>
            <div className="card">
              <p>Brainstorm team bonding activities for our work retreat</p>
              <img src={assets.message_icon} alt="" />
            </div>
            <div className="card">
              <p>Improve the readability of the following code</p>
              <img src={assets.code_icon} alt="" />
            </div>
          </div>
        </> :
          <>
            <div className="result">
              {allChats.length > 0 && allChats[0].map((chat, index) =>
                <Fragment key={index}>
                  <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{chat.prompt}</p>
                  </div>
                  <div className='result-data'>
                    <img src={assets.gemini_icon} alt="" />
                    <div >
                      <Markdown
                        children={chat.result}
                        components={{
                          code(props) {
                            const { children, className, node, ...rest } = props
                            const match = /language-(\w+)/.exec(className || '')
                            return match ? (
                              <SyntaxHighlighter
                                {...rest}
                                PreTag="div"
                                children={String(children).replace(/\n$/, '')}
                                language={match[1]}
                                style={atelierForestLight}
                              />
                            ) : (
                              <code {...rest} className={className}>
                                {children}
                              </code>
                            )
                          }
                        }}
                      />
                    </div>
                  </div>
                </Fragment>
              )}
            </div>

            {/* <div className='result'>
              <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
              </div>
              <div className='result-data'>
                <img src={assets.gemini_icon} alt="" />
                {
                  loading ?
                    <div className='loader'>
                      <hr />
                      <hr />
                      <hr />
                    </div> :
                    <div >
                      <Markdown
                        children={resultData}
                        components={{
                          code(props) {
                            const { children, className, node, ...rest } = props
                            const match = /language-(\w+)/.exec(className || '')
                            return match ? (
                              <SyntaxHighlighter
                                {...rest}
                                PreTag="div"
                                children={String(children).replace(/\n$/, '')}
                                language={match[1]}
                                style={atelierForestLight}
                              />
                            ) : (
                              <code {...rest} className={className}>
                                {children}
                              </code>
                            )
                          }
                        }}
                      />
                    </div>

                }

              </div>
            </div> */}
          </>
        }


        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter your prompt here' />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main