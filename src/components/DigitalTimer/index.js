import React, {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timerLimit: 25, // Default timer limit set to 25 minutes
    timeElapsedInSeconds: 0, // Tracks the elapsed time in seconds
  }

  componentWillUnmount() {
    clearInterval(this.intervalId) // Clear interval when component is unmounted
  }

  // Format time from seconds to MM:SS format
  formatTime = () => {
    const {timerLimit, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds = timerLimit * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = totalRemainingSeconds % 60

    const formattedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const formattedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${formattedMinutes}:${formattedSeconds}`
  }

  // Toggle start/pause functionality
  handleStartPause = () => {
    const {isTimerRunning, timerLimit, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timerLimit * 60 === timeElapsedInSeconds

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }

    if (isTimerRunning) {
      clearInterval(this.intervalId)
    } else {
      this.intervalId = setInterval(this.incrementTime, 1000)
    }

    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  // Increment elapsed time by 1 second
  incrementTime = () => {
    const {timerLimit, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timerLimit * 60 === timeElapsedInSeconds

    if (isTimerCompleted) {
      clearInterval(this.intervalId)
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  // Reset timer to initial values
  handleReset = () => {
    clearInterval(this.intervalId)
    this.setState({
      isTimerRunning: false,
      timeElapsedInSeconds: 0,
      timerLimit: 25, // Reset to default timer limit
    })
  }

  // Increment timer limit by 1 minute
  incrementTimerLimit = () => {
    this.setState(prevState => ({timerLimit: prevState.timerLimit + 1}))
  }

  // Decrement timer limit by 1 minute (ensuring it doesn't go below 1)
  decrementTimerLimit = () => {
    this.setState(prevState => {
      if (prevState.timerLimit > 1) {
        return {timerLimit: prevState.timerLimit - 1}
      }
      return null
    })
  }

  render() {
    const {isTimerRunning, timerLimit, timeElapsedInSeconds} = this.state
    const isStartButtonText = isTimerRunning ? 'Pause' : 'Start'
    const statusText = isTimerRunning ? 'Running' : 'Paused'
    const startPauseIconUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startPauseIconAltText = isTimerRunning ? 'pause icon' : 'play icon'
    const isButtonsDisabled = timeElapsedInSeconds > 0

    return (
      <div className="dt-background">
        <h1 className="dt-title">Digital Timer</h1>
        <div className="dt-section">
          <div className="timer-section">
            <div className="timer-display">
              <h1 className="time">{this.formatTime()}</h1>
              <p className="status">{statusText}</p>
            </div>
          </div>
          <div className="timer-control-section">
            <div className="button-section">
              <button
                className="control-button start-button"
                onClick={this.handleStartPause}
              >
                <img
                  src={startPauseIconUrl}
                  alt={startPauseIconAltText}
                  className="icon"
                />
                {isStartButtonText}
              </button>
              <button
                className="control-button reset-button"
                onClick={this.handleReset}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="icon"
                />
                Reset
              </button>
            </div>
            <div className="timer-limit-control">
              <p className="limit-label">Set Timer limit</p>
              <div className="limit-controls">
                <button
                  className="limit-button"
                  onClick={this.decrementTimerLimit}
                  disabled={isButtonsDisabled}
                >
                  -
                </button>
                <p className="limit-value">{timerLimit}</p>
                <button
                  className="limit-button"
                  onClick={this.incrementTimerLimit}
                  disabled={isButtonsDisabled}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
