import {Injectable} from '@angular/core';
import {Measure, MeasureReason, TrainFailure} from "../shared/measure";
import {Agent} from "../shared/agent";
import {Station} from "../shared/station";
import {StationService} from "./station.service";
import {AgentService} from "./agent.service";

@Injectable({
  providedIn: 'root'
})
export class XmlToMeasureService {
  domParser: DOMParser;
  stations: Station[] = [];
  agents: Agent[] = []

  constructor(
    private stationService: StationService,
    private agentService: AgentService,
  ) {
    this.domParser = new DOMParser();
    this.stationService.getAll().subscribe((res) => this.stations = res);
    this.agentService.getAll().subscribe((res) => this.agents = res);
  }

  public xmlToMeasure(frResult: string): Measure {
    let xmlDom = this.domParser.parseFromString(frResult, "text/xml");
    let agent = this.xmlToAgent(xmlDom.querySelector('sender'));
    let trainFailureList = this.xmlToTrainFailureList(xmlDom.querySelectorAll('zug'));
    let reasons = this.xmlToReasons(xmlDom.querySelectorAll('strecke'));
    let answer = '';
    if (xmlDom.querySelector('antwort')) {
      answer = xmlDom.querySelector('antwort').textContent;
    }
    let agentList: Agent[] = [];
    agentList.push(agent);

    let measure: Measure = {
      name: xmlDom.querySelector('master_fplo').textContent,
      start: reasons[0].start,
      end: reasons[reasons.length-1].end,
      startPoint: reasons[0].startPoint,
      endPoint: reasons[0].endPoint,
      measureKind: 'Baumaßnahme',
      responseDate: answer,
      agents: agentList,
      trainFailures: trainFailureList,
      reasons: reasons,
    };
    return measure;
  }

  private xmlToAgent(element: Element): Agent {
    let agent: Agent;
    for (let storedAgent of this.agents) {
      if (storedAgent.email.toLowerCase() == element.querySelector('email').textContent.toLowerCase()) {
        agent = storedAgent
      }
    }

    if (agent == undefined) {
      agent = this.createAgent(element);
    }
    return agent;
  }

  private xmlToTrainFailureList(elementNodeList: NodeListOf<Element>): TrainFailure[] {
    let trainFailureList: TrainFailure[] = [];
    for (let i=0; i < elementNodeList.length; i++) {
      if (elementNodeList[i].querySelector('abweichung').getAttribute('art') == 'ausfall') {
        let trainFailure: TrainFailure = {
          trafficDay: elementNodeList[i].getAttribute('verkehrstag'),
          trainNumber: elementNodeList[i].getAttribute('zugnr'),
          line: elementNodeList[i].querySelector('liniennr').textContent,
          trainType: elementNodeList[i].getAttribute('zugbez'),
          startPoint: this.getStation(elementNodeList[i].querySelector('abgangsbahnhof').getAttribute('ds100')),
          endPoint: this.getStation(elementNodeList[i].querySelector('zielbahnhof').getAttribute('ds100')),
          failureFrom: this.getStation(elementNodeList[i].querySelector('ausfallvon').getAttribute('ds100')),
          failureTo: this.getStation(elementNodeList[i].querySelector('ausfallbis').getAttribute('ds100')),
        }
        trainFailureList.push(trainFailure);
      }
    }
    return trainFailureList;
  }

  private xmlToReasons(elementNodeList: NodeListOf<Element>): MeasureReason[] {
    let measureReasons: MeasureReason[] = [];
    for (let i=0; i < elementNodeList.length; i++) {
      let startPointValue = this.getStation(elementNodeList[i].querySelector('startbst').textContent);
      let endPointValue = this.getStation(elementNodeList[i].querySelector('endbst').textContent);
      let disturbedValue = false;
      if (startPointValue == undefined) {
         startPointValue = this.createStation(elementNodeList[i].querySelector('startbst').textContent);
      }
      if (endPointValue == undefined) {
        endPointValue = this.createStation(elementNodeList[i].querySelector('endbst').textContent)
      }
      if (elementNodeList[i].querySelector('zeitraum_unterbrochen').textContent == 'Ja') {
        disturbedValue = true;
      }

      let measureReason: MeasureReason = {
        reason: elementNodeList[i].querySelector('grund').textContent,
        startPoint: startPointValue,
        endPoint: endPointValue,
        operatingMode: elementNodeList[i].querySelector('betriebsweise').textContent,
        start: this.getDateAsString(elementNodeList[i].querySelector('baubeginn').textContent),
        end: this.getDateAsString(elementNodeList[i].querySelector('bauende').textContent),
        disturbed: disturbedValue
      }
      measureReasons.push(measureReason);
    }
    return measureReasons;
  }

  private getStation(textContent: string): Station {
    let station: Station;
    for (let stationInList of this.stations) {
      if (stationInList.rl100 === textContent) {
        station = stationInList;
      }
    }
    return station;
  }

  private createStation(textContent: string): Station {
    let stationToCreate: Station = {
      name: textContent,
      rl100: textContent,
      stationType: 'Bahnhof'
    }
    this.stationService.create(stationToCreate).subscribe((res) => {
      stationToCreate = res;
      return res;
    });
    return stationToCreate;
  }

  private createAgent(element: Element): Agent {
    let agent: Agent = {
      email: element.querySelector('email').textContent,
      firstName: element.querySelector('vorname').textContent,
      lastName: element.querySelector('name').textContent,
      initials:  element.querySelector('kuerzel').textContent,
      phone:  element.querySelector('telefon').textContent,
      fax:  '',
    }

    this.agentService.create(agent).subscribe((res) => agent = res)
    return agent;
  }

  private getDateAsString(textContent: string) {
    return textContent.slice(0, 10);
  }
}
