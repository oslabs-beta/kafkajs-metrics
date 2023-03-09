import React from 'react';
import KeyFeatureComponent from "./keyFeatureComponent.jsx"
import howToComponents from './howToComponents.jsx';
import Footer from './footer.jsx';

export default function Home() {
    return (
    <>    
        <div className='container'>
        <div className="Content-Container">
            <div className="contents">
            <p>Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            </div>
        <div>
            <img src="https://d29fhpw069ctt2.cloudfront.net/icon/image/74158/preview.svg" style={{ width: '500px', height: '400px' }} />
        </div>
        </div>
        
        </div>
        <div className='keyFeatureContainer'>
            <div className="keyFeatureContainerContents">
            <div className="contents">
            <h1>Key Features</h1>
            <div className="feature">
            <KeyFeatureComponent 
                img="https://www.cambridgemaths.org/Images/The-trouble-with-graphs.jpg"
                name="Instrumentation Events"
                desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
            />
            <KeyFeatureComponent  
                img="https://cdn-icons-png.flaticon.com/512/2257/2257295.png"
                name="Breakpoint Alerts"
                desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
            />
            <KeyFeatureComponent 
                img="https://www.cambridgemaths.org/Images/The-trouble-with-graphs.jpg"
                name="Logs"
                desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
            />
            <KeyFeatureComponent  
                img="https://cdn-icons-png.flaticon.com/512/2257/2257295.png"
                name="Easy Installation"
                desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
            />
            <KeyFeatureComponent 
                img="https://www.cambridgemaths.org/Images/The-trouble-with-graphs.jpg"
                name="CLI Tools"
                desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
            />
            <KeyFeatureComponent  
                img="https://cdn-icons-png.flaticon.com/512/2257/2257295.png"
                name="100% Javascript"
                desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
            />
              </div>
            </div>
        </div>
        </div>
        
        <div className='howToContainer'>
            <div className="howToContainerContents">
            <div className="contents">
            <h1>How to download</h1>
            <div className="howToContent">
            <KeyFeatureComponent 
                name="Instrumentation Events"
                img="https://cdn-icons-png.flaticon.com/512/2257/2257295.png"
                desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
            
            />
            <KeyFeatureComponent  
                img="https://www.cambridgemaths.org/Images/The-trouble-with-graphs.jpg"
                name="Breakpoint Alerts"
                desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
            
            />
            <KeyFeatureComponent 
                img="https://cdn-icons-png.flaticon.com/512/2257/2257295.png"
                name="Logs"
                desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
            
            />
              </div>
            </div>
        </div>
        </div>
        <Footer/>
    </>
    )
}