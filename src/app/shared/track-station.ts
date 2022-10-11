import {Track} from "./track";

export interface TrackStation {
  id?: string
  currentNumber?: number
  name?: string
  rl100?: string
  stationType?: string
  positionValue?: number
  transferTime?: number
  railReplacementStop?: boolean
  railReplacementDrivingTime?: number
  track?: Track
}
