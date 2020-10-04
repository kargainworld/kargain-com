import React from 'react'
import Link from 'next-translate/Link'

const page403 = () => {
    return(
        <>
            <style global jsx>{`
body{
  background-color: #1C2127;
}
.root{
    display:flex
}
.left{
    position : relative;
    flex : 2
}
.right{
    flex : 1;
    display: flex;
    flex-direction: column;
    margin-left: auto;
    align-items: flex-end;
}
.message{
  font-family: 'Poppins', sans-serif;
  font-size: 30px;
  color: white;
  font-weight: 500;
  position: absolute;
  top: 230px;
  left: 40px;
}
.message2{
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  color: white;
  font-weight: 300;
  width: 360px;
  position: absolute;
  top: 280px;
  left: 40px;
}

.neon{
  text-align: center;
  width: 300px;
  margin-top: 30px;
  margin-bottom: 10px;
  font-family: 'Varela Round', sans-serif;
  font-size: 90px;
  color: #5BE0B3;
  letter-spacing: 3px;
  text-shadow: 0 0 5px #6EECC1;
  animation: flux 2s linear infinite;
  
}
.trash{
  width: 170px;
  height: 220px;
  background-color: #585F67;
  top: 300px;
}
.can{
  width: 190px;
  height: 30px;
  background-color: #6B737C;
  border-radius: 15px 15px 0 0;
}
.door-frame {
  height: 495px;
  width: 295px;
  border-radius: 90px 90px 0 0;
  background-color: #8594A5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.door{
  height: 450px;
  width: 250px;
  border-radius: 70px 70px 0 0;
  background-color: #A0AEC0;
}

.eye{
  top: 15px;
  left: 25px;
  height: 5px;
  width: 15px;
  border-radius: 50%;
  background-color: white;
  animation: eye 7s ease-in-out infinite;
  position: absolute;
 }
.eye2{
  left: 65px;
}

.window{
  height: 40px;
  width: 130px;
  background-color: #1C2127;
  border-radius: 3px;
  margin: 80px auto;
  position: relative;
}

.leaf{
  height: 40px;
  width: 130px;
  background-color: #8594A5;
  border-radius: 3px;
  margin: 80px auto;
  animation: leaf 7s infinite;
  transform-origin: right;
}

.handle {
  height: 8px;
  width: 50px;
  border-radius: 4px;
  background-color: #EBF3FC;
  position: absolute;
  margin-top: 250px;
  margin-left: 30px;
}

.rectangle {
  height: 70px;
  width: 25px;
  background-color: #CBD8E6;
  border-radius: 4px;
  position: absolute;
  margin-top: 220px;
  margin-left: 20px;
}

@keyframes leaf {
  0% {
    transform: scaleX(1);
  }
  5% {
    transform: scaleX(0.2);
  }
  70%{
    transform: scaleX(0.2);
  }
  75%{
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(1);
  }
}

@keyframes eye {
  0% {
    opacity: 0;
    transform: translateX(0)
  }
  5% {
    opacity: 0;
  }
  15%{
    opacity: 1;
    transform: translateX(0)
  }
  20% {
    transform: translateX(15px)
  }
  35%{
    transform: translateX(15px)
  }
  40%{
    transform: translateX(-15px)
  }
  60%{
    transform: translateX(-15px)
  }
  65% {
    transform: translateX(0)
  }
}

@keyframes flux {
  0%,
  100% {
    text-shadow: 0 0 5px #00FFC6, 0 0 15px #00FFC6, 0 0 50px #00FFC6, 0 0 50px #00FFC6, 0 0 2px #B9FFE8, 2px 2px 3px #12E29C;
    color: #4BFFEF;
  }
  50% {
    text-shadow: 0 0 3px #00B58D, 0 0 7px #00B58D, 0 0 25px #00B58D, 0 0 25px #00B58D, 0 0 2px #00B58D, 2px 2px 3px #006A60;
    color: #63D3AE;
  }
}
            `}</style>

            <div className="root">
                <div className="left">
                    <div className="message">
                        <p>You are not authorized.</p>
                        <p>You tried to access a page you did not have prior authorization for.</p>
                        <Link href="/">
                            <a className="btn bg-white">
                                Kargain
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="right">
                    <div className="neon">403</div>
                    <div className="door-frame">
                        <div className="door">
                            <div className="rectangle">
                            </div>
                            <div className="handle">
                            </div>
                            <div className="window">
                                <div className="eye">
                                </div>
                                <div className="eye eye2">
                                </div>
                                <div className="leaf">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page403