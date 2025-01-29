import React, { useState } from 'react';
import LayOut from '../components/LayOut';
import bgImage from '../assets/images/bg_2.jpg';
import aboutImage from '../assets/images/about.jpg';

const AboutPage = () => {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState('what-we-do');

  return (
    <LayOut>
      {/* Hero Section */}
      <div className="hero-wrap relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="overlay absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center items-center">
            <p className="breadcrumbs text-white mb-4">
              <span>About</span>
            </p>
            <h1 className="text-white text-4xl font-bold mb-4">About Us</h1>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 h-96 bg-cover bg-center" style={{ backgroundImage: `url(${aboutImage})` }}></div>
            <div className="w-full md:w-1/2 p-8">
              <div className="flex flex-col">
                {/* Tab Navigation */}
                <div className="mb-8">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setActiveTab('what-we-do')}
                      className={`nav-link ${activeTab === 'what-we-do' ? 'active' : ''}`}
                    >
                      What we do
                    </button>
                    <button
                      onClick={() => setActiveTab('mission')}
                      className={`nav-link ${activeTab === 'mission' ? 'active' : ''}`}
                    >
                      Our mission
                    </button>
                    <button
                      onClick={() => setActiveTab('goal')}
                      className={`nav-link ${activeTab === 'goal' ? 'active' : ''}`}
                    >
                      Our goal
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="tab-content">
                  {activeTab === 'what-we-do' && (
                    <div id="what-we-do" className="tab-pane">
                      <h2 className="text-2xl font-bold mb-4">Offering Reliable Hosting</h2>
                      <p className="mb-4">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt voluptate, quibusdam sunt iste dolores consequatur</p>
                    </div>
                  )}

                  {activeTab === 'mission' && (
                    <div id="mission" className="tab-pane">
                      <h2 className="text-2xl font-bold mb-4">Exceptional Web Solutions</h2>
                      <p className="mb-4">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt voluptate, quibusdam sunt iste dolores consequatur</p>
                    </div>
                  )}

                  {activeTab === 'goal' && (
                    <div id="goal" className="tab-pane">
                      <h2 className="text-2xl font-bold mb-4">Help Our Customer</h2>
                      <p className="mb-4">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt voluptate, quibusdam sunt iste dolores consequatur</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* FAQ Section */}
<section className="bg-gray-100 py-20">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <span className="text-gray-600">FAQS</span>
      <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Column */}
      <div>
        {/* FAQ 1 */}
        <div className="card mb-4">
          <div className="card-header p-4 bg-white">
            <a href="#menuone" className="flex justify-between items-center">
              <span>When she reached the first hills?</span>
              <span className="icon">+</span>
            </a>
          </div>
          <div id="menuone" className="card-body p-4 bg-gray-50">
            <p>When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove...</p>
          </div>
        </div>

        {/* FAQ 2 */}
        <div className="card mb-4">
          <div className="card-header p-4 bg-white">
            <a href="#menutwo" className="flex justify-between items-center">
              <span>Italic Mountains, she had a last?</span>
              <span className="icon">+</span>
            </a>
          </div>
          <div id="menutwo" className="card-body p-4 bg-gray-50">
            <p>When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove...</p>
          </div>
        </div>

        {/* FAQ 3 */}
        <div className="card mb-4">
          <div className="card-header p-4 bg-white">
            <a href="#menuthree" className="flex justify-between items-center">
              <span>Bookmarksgrove, the headline?</span>
              <span className="icon">+</span>
            </a>
          </div>
          <div id="menuthree" className="card-body p-4 bg-gray-50">
            <p>When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove...</p>
          </div>
        </div>

        {/* FAQ 4 */}
        <div className="card mb-4">
          <div className="card-header p-4 bg-white">
            <a href="#menufour" className="flex justify-between items-center">
              <span>Alphabet Village and the subline of her own?</span>
              <span className="icon">+</span>
            </a>
          </div>
          <div id="menufour" className="card-body p-4 bg-gray-50">
            <p>When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove...</p>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div>
        {/* FAQ 5 */}
        <div className="card mb-4">
          <div className="card-header p-4 bg-white">
            <a href="#menufive" className="flex justify-between items-center">
              <span>Then she continued her way?</span>
              <span className="icon">+</span>
            </a>
          </div>
          <div id="menufive" className="card-body p-4 bg-gray-50">
            <p>When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove...</p>
          </div>
        </div>

        {/* FAQ 6 */}
        <div className="card mb-4">
          <div className="card-header p-4 bg-white">
            <a href="#menusix" className="flex justify-between items-center">
              <span>Skyline of her hometown Bookmarksgrove?</span>
              <span className="icon">+</span>
            </a>
          </div>
          <div id="menusix" className="card-body p-4 bg-gray-50">
            <p>When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove...</p>
          </div>
        </div>

        {/* FAQ 7 */}
        <div className="card mb-4">
          <div className="card-header p-4 bg-white">
            <a href="#menuseven" className="flex justify-between items-center">
              <span>What is the Line Lane?</span>
              <span className="icon">+</span>
            </a>
          </div>
          <div id="menuseven" className="card-body p-4 bg-gray-50">
            <p>The Line Lane is a small road in Alphabet Village, known for its picturesque views and historical significance.</p>
          </div>
        </div>

        {/* FAQ 8 */}
        <div className="card mb-4">
          <div className="card-header p-4 bg-white">
            <a href="#menueight" className="flex justify-between items-center">
              <span>Why is it called the Italic Mountains?</span>
              <span className="icon">+</span>
            </a>
          </div>
          <div id="menueight" className="card-body p-4 bg-gray-50">
            <p>The Italic Mountains are named after their unique, sloping terrain that resembles italicized text.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </LayOut>
  );
};

export default AboutPage;