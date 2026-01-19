// Robot Memory TV Display Controller
class RobotMemoryTV {
    constructor() {
        this.currentChannel = 1;
        this.currentSize = 100; // percentage
        this.volume = 50;
        this.isOn = true;
        this.channels = [
            { id: 1, name: "Home Screen", type: "home" },
            { id: 2, name: "Features Demo", type: "features" },
            { id: 3, name: "Specifications", type: "specs" },
            { id: 4, name: "Owner Info", type: "owner" },
            { id: 5, name: "Wireless Demo", type: "wireless" },
            { id: 6, name: "Touch Demo", type: "touch" }
        ];
        
        this.initializeTV();
    }
    
    initializeTV() {
        this.setupEventListeners();
        this.updateDisplay();
        this.startAnimationLoop();
    }
    
    setupEventListeners() {
        // Power button
        document.getElementById('power-btn')?.addEventListener('click', () => this.togglePower());
        
        // Channel controls
        document.getElementById('channel-up')?.addEventListener('click', () => this.channelUp());
        document.getElementById('channel-down')?.addEventListener('click', () => this.channelDown());
        
        // Volume controls
        document.getElementById('volume-up')?.addEventListener('click', () => this.volumeUp());
        document.getElementById('volume-down')?.addEventListener('click', () => this.volumeDown());
        
        // Size controls
        document.getElementById('size-up')?.addEventListener('click', () => this.sizeUp());
        document.getElementById('size-down')?.addEventListener('click', () => this.sizeDown());
        
        // Direct channel buttons
        document.querySelectorAll('.channel-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const channel = parseInt(e.target.dataset.channel);
                this.setChannel(channel);
            });
        });
        
        // Touch screen functionality
        const touchscreen = document.getElementById('tv-touchscreen');
        if (touchscreen) {
            touchscreen.addEventListener('click', (e) => this.handleTouch(e));
        }
    }
    
    togglePower() {
        this.isOn = !this.isOn;
        const tvScreen = document.getElementById('tv-screen');
        if (tvScreen) {
            tvScreen.style.opacity = this.isOn ? '1' : '0';
            tvScreen.style.transition = 'opacity 0.5s';
        }
        this.updateDisplay();
    }
    
    channelUp() {
        this.currentChannel = this.currentChannel >= this.channels.length ? 1 : this.currentChannel + 1;
        this.updateDisplay();
    }
    
    channelDown() {
        this.currentChannel = this.currentChannel <= 1 ? this.channels.length : this.currentChannel - 1;
        this.updateDisplay();
    }
    
    setChannel(channel) {
        if (channel >= 1 && channel <= this.channels.length) {
            this.currentChannel = channel;
            this.updateDisplay();
        }
    }
    
    volumeUp() {
        this.volume = Math.min(100, this.volume + 10);
        this.updateDisplay();
    }
    
    volumeDown() {
        this.volume = Math.max(0, this.volume - 10);
        this.updateDisplay();
    }
    
    sizeUp() {
        this.currentSize = Math.min(150, this.currentSize + 10);
        this.updateScreenSize();
    }
    
    sizeDown() {
        this.currentSize = Math.max(50, this.currentSize - 10);
        this.updateScreenSize();
    }
    
    updateScreenSize() {
        const tvScreen = document.getElementById('tv-screen');
        if (tvScreen) {
            tvScreen.style.transform = `scale(${this.currentSize / 100})`;
            tvScreen.style.transition = 'transform 0.3s ease';
        }
        this.updateDisplay();
    }
    
    handleTouch(event) {
        if (!this.isOn) return;
        
        const touchArea = document.getElementById('tv-touchscreen');
        const rect = touchArea.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Create ripple effect
        this.createRipple(x, y);
        
        // Handle different touch zones
        if (y < rect.height * 0.3) {
            // Top zone - channel up
            this.channelUp();
        } else if (y > rect.height * 0.7) {
            // Bottom zone - channel down
            this.channelDown();
        } else {
            // Middle zone - toggle size
            this.currentSize = this.currentSize >= 150 ? 100 : this.currentSize + 10;
            this.updateScreenSize();
        }
    }
    
    createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        const touchArea = document.getElementById('tv-touchscreen');
        touchArea.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
    
    updateDisplay() {
        // Update channel display
        const channelDisplay = document.getElementById('channel-display');
        if (channelDisplay) {
            channelDisplay.textContent = `CH ${this.currentChannel}`;
        }
        
        // Update volume display
        const volumeDisplay = document.getElementById('volume-display');
        if (volumeDisplay) {
            volumeDisplay.textContent = `VOL ${this.volume}%`;
        }
        
        // Update size display
        const sizeDisplay = document.getElementById('size-display');
        if (sizeDisplay) {
            sizeDisplay.textContent = `SIZE ${this.currentSize}%`;
        }
        
        // Update power indicator
        const powerIndicator = document.getElementById('power-indicator');
        if (powerIndicator) {
            powerIndicator.className = this.isOn ? 'power-on' : 'power-off';
        }
        
        // Update screen content
        this.updateScreenContent();
    }
    
    updateScreenContent() {
        const screenContent = document.getElementById('screen-content');
        if (!screenContent || !this.isOn) return;
        
        const channel = this.channels[this.currentChannel - 1];
        
        let content = '';
        switch(channel.type) {
            case 'home':
                content = this.getHomeContent();
                break;
            case 'features':
                content = this.getFeaturesContent();
                break;
            case 'specs':
                content = this.getSpecsContent();
                break;
            case 'owner':
                content = this.getOwnerContent();
                break;
            case 'wireless':
                content = this.getWirelessContent();
                break;
            case 'touch':
                content = this.getTouchContent();
                break;
        }
        
        screenContent.innerHTML = content;
    }
    
    getHomeContent() {
        return `
            <div class="screen-home">
                <h1>🤖 Robot Memory TV</h1>
                <div class="robot-animation">
                    <div class="robot-head">
                        <div class="robot-eye left"></div>
                        <div class="robot-eye right"></div>
                        <div class="robot-mouth"></div>
                    </div>
                </div>
                <p class="tagline">Advanced Display Technology</p>
                <div class="status-indicators">
                    <div class="indicator">
                        <span class="indicator-label">HD Display</span>
                        <div class="indicator-bar active"></div>
                    </div>
                    <div class="indicator">
                        <span class="indicator-label">Wireless</span>
                        <div class="indicator-bar active"></div>
                    </div>
                    <div class="indicator">
                        <span class="indicator-label">Touchscreen</span>
                        <div class="indicator-bar active"></div>
                    </div>
                </div>
            </div>
        `;
    }
    
    getFeaturesContent() {
        return `
            <div class="screen-features">
                <h2>✨ Key Features</h2>
                <div class="feature-list">
                    <div class="feature-item">🎨 Full Color HD Display</div>
                    <div class="feature-item">📡 Wireless Connectivity</div>
                    <div class="feature-item">📺 Adjustable Screen Size</div>
                    <div class="feature-item">🤖 Robot Memory System</div>
                    <div class="feature-item">🖱️ Interactive Touchscreen</div>
                    <div class="feature-item">📡 Smart TV Tuner</div>
                </div>
            </div>
        `;
    }
    
    getSpecsContent() {
        return `
            <div class="screen-specs">
                <h2>⚙️ Specifications</h2>
                <div class="specs-scroll">
                    <div class="spec-row">
                        <span>Display:</span>
                        <span>LED Panel</span>
                    </div>
                    <div class="spec-row">
                        <span>Processor:</span>
                        <span>System on Chip</span>
                    </div>
                    <div class="spec-row">
                        <span>Memory:</span>
                        <span>High-Speed RAM</span>
                    </div>
                    <div class="spec-row">
                        <span>Connectivity:</span>
                        <span>Wi-Fi + Bluetooth</span>
                    </div>
                    <div class="spec-row">
                        <span>Touch:</span>
                        <span>Capacitive Layer</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    getOwnerContent() {
        return `
            <div class="screen-owner">
                <h2>👤 Owner Information</h2>
                <div class="owner-card">
                    <div class="owner-avatar">👨‍💼</div>
                    <h3>Olawale Abdul-Ganiyu</h3>
                    <p class="company">Adegan Global</p>
                    <div class="owner-badge">
                        <span>🏆</span>
                        <span>Innovation Leader</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    getWirelessContent() {
        return `
            <div class="screen-wireless">
                <h2>📡 Wireless Status</h2>
                <div class="wireless-animation">
                    <div class="wifi-symbol">
                        <div class="wifi-bar bar1"></div>
                        <div class="wifi-bar bar2"></div>
                        <div class="wifi-bar bar3"></div>
                        <div class="wifi-bar bar4"></div>
                    </div>
                    <div class="connection-status">
                        <span class="status-dot"></span>
                        <span class="status-text">Connected</span>
                    </div>
                </div>
                <div class="network-info">
                    <div class="network-item">
                        <span>Signal:</span>
                        <span>Excellent</span>
                    </div>
                    <div class="network-item">
                        <span>Speed:</span>
                        <span>1 Gbps</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    getTouchContent() {
        return `
            <div class="screen-touch">
                <h2>🖱️ Touchscreen Demo</h2>
                <div class="touch-instructions">
                    <p>Click anywhere on screen!</p>
                    <div class="touch-zones">
                        <div class="zone zone-top">
                            <span>⬆️ Channel Up</span>
                        </div>
                        <div class="zone zone-middle">
                            <span>↔️ Change Size</span>
                        </div>
                        <div class="zone zone-bottom">
                            <span>⬇️ Channel Down</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    startAnimationLoop() {
        setInterval(() => {
            if (this.isOn) {
                this.animateElements();
            }
        }, 100);
    }
    
    animateElements() {
        // Animate robot eyes
        const eyes = document.querySelectorAll('.robot-eye');
        eyes.forEach(eye => {
            const randomScale = 0.8 + Math.random() * 0.4;
            eye.style.transform = `scale(${randomScale})`;
        });
        
        // Animate WiFi bars
        const wifiBars = document.querySelectorAll('.wifi-bar');
        wifiBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.opacity = '1';
            }, index * 100);
        });
    }
}

// Initialize TV when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.robotTV = new RobotMemoryTV();
});