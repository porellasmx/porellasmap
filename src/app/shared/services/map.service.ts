import { Injectable, OnDestroy } from '@angular/core';
import { Report } from '../models/report.model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Marker } from '../models/marker.model';
import { HttpClient } from '@angular/common/http';
import { map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private newReportSource = new BehaviorSubject<Report>(null);
  $newReport = this.newReportSource.asObservable();

  private tempMarkerSource = new BehaviorSubject<Marker>(null);
  $tempMarker = this.tempMarkerSource.asObservable();

  private reportsSource = new BehaviorSubject<Report[]>(null);
  $reports = this.reportsSource.asObservable();

  BASE_URL = 'http://localhost:3000/api/reports';

  constructor(private http: HttpClient) {}

  setNewReport(report: Report) {
    this.newReportSource.next(report);
  }

  setTempMarker(marker: Marker) {
    this.tempMarkerSource.next(marker);
  }

  addReport(report: Report): Observable<{ message: string; report: Report; status: number }> {
    return this.http.post<{ message: string; report: Report; status: number }>(
      this.BASE_URL,
      report
    );
  }

  getReportsDB(): void {
    this.http
      .get<Report[]>(this.BASE_URL)
      .pipe(first())
      .subscribe(reportsData => {
        this.setReports(reportsData);
      });
  }

  setReports(reports: Report[]): void {
    this.reportsSource.next(reports);
  }

  getReport(reportID: number): Observable<Report> {
    return null;
  }

  updateReport(report: Report): Observable<Report> {
    return null;
  }

  deleteReport(reportID: number): Observable<Report> {
    return null;
  }
}
