import {Track} from "./track";

export interface Line {
  id?: string
  name?: string
  line?: string
  tracks?: Track[]
}
