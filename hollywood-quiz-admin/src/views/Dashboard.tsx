/* eslint-disable */
import React, { useEffect, useState } from "react";
import ApiService from "services/ApiService";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import Loading from "components/Loading";

const Dashboard = () => {
    const apiService = ApiService();
    const startDate = moment()
        .add(-1, "d")
        .toDate();
    const endDate = moment()
        .add(0, "d")
        .toDate();

    const [analyticData, setAnalyticData] = useState([]);
    const [funnelData, setFunnelData] = useState([]);
    const [byPlayerReport, setByPlayerReport] = useState([]);

    const [isWorking, setIsWorking] = useState(false);

    const [fromDate, setFromDate] = useState(startDate);
    const [toDate, setToDate] = useState(endDate);
    const [searchToDate, setSearchToDate] = useState(toDate);
    const [searchFromDate, setSearchFromDate] = useState(fromDate);

    useEffect(() => {
        getReports();
    }, []);

    function getReports() {
        setSearchFromDate(fromDate);
        setSearchToDate(toDate);

        setIsWorking(true);

        var dateRange = { fromDate, toDate };
        apiService.getAnalytics(dateRange).then((data: any) => {
            data = data.data;
            if (!data) return;

            setIsWorking(false);
            setAnalyticData(data);
            console.log('analytics', data);
        });

        apiService.getFunnelData(dateRange).then((data: any) => {
            data = data.data;
            setFunnelData(data);
        });

        apiService.playerCount(dateRange).then((data: any) => {
            data = data.data;
            setByPlayerReport(data);
        });
    }

    function getAnalyticData() {
        const columns = [
            {
                name: "Day",
                selector: "day",
                sortable: true,
                format: d => {
                    return moment(d.day)
                        .local()
                        .format("ll");
                }
            },
            // {
            //     name: "Unique Player Entered",
            //     selector: "uniquePlayerEntered",
            //     sortable: true
            // },
            {
                name: "Total Game Played",
                selector: "totalGamePlayed",
                sortable: true
            },
            {
                name: "Total Revenue",
                selector: "totalGamePlayers",
                sortable: true,
                format: d => {
                    return "$" + d.totalGamePlayers;
                }
            },
            {
                name: "Total Jackpot",
                selector: "totalJackpot",
                sortable: true,
                format: d => {
                    return "$" + d.totalJackpot;
                }
            },
            {
                name: "First Time Depositors",
                selector: "uniquePlayerEntered",
                sortable: true
            },
            {
                name: "First Time Deposits",
                selector: "uniquePlayerEntered",
                sortable: true,
                format: d => {
                    return "$" + d.uniquePlayerEntered;
                }
            },
            {
                name: "Repeat Depositors",
                selector: "repeatPlayers",
                sortable: true
            },
            {
                name: "Repeat Deposits",
                selector: "repeatPlayers",
                sortable: true,
                format: d => {
                    return "$" + d.repeatPlayers;
                }
            }
        ];

        return <DataTable columns={columns} data={analyticData} />;
    }

    function getFunnelData() {
        const columns = [
            {
                name: "Day",
                selector: "day",
                sortable: true,
                format: d => {
                    return moment(d.day)
                        .local()
                        .format("ll");
                }
            },
            {
                name: "Players Start Game",
                selector: "totalGamePlayers",
                sortable: true
            },
            {
                name: "Players Disconnected",
                selector: "playersDisconnected",
                sortable: true
            },
            {
                name: "Players played full game",
                selector: "playersPlayFullGame",
                sortable: true
            },
            {
                name: "Players played another game",
                selector: "playMoreThanOneGame",
                sortable: true
            },
            {
                name: "Players Use Game Chat",
                selector: "playerUseGameChat",
                sortable: true
            }
        ];

        return <DataTable columns={columns} data={funnelData} />;
    }

    return (
        <div className="content border dashboard-wrap mt-4">
            <Loading isWorking={isWorking} />

            <div className="row justify-content-end pb-3">
                <div className="col-auto">
                    <label className="mr-2">From</label>
                    <DatePicker
                        selected={fromDate}
                        className="form-control"
                        maxDate={new Date()}
                        onChange={date => setFromDate(date)}
                    />
                </div>

                <div className="col-auto">
                    <label className="mr-2">To</label>
                    <DatePicker
                        selected={toDate}
                        className="form-control"
                        maxDate={new Date()}
                        onChange={date => setToDate(date)}
                    />
                </div>

                <div className="col-auto text-right">
                    <button
                        className="btn btn-primary btn-black"
                        onClick={() => {
                            getReports();
                        }}
                    >
                        Search
                    </button>
                </div>
            </div>

            <h2 className="main-title">
                Reporting/Analytics{" - "}
                <span className="searched-time-wrap">
                    <div className="badge badge-dark">
                        {moment(searchFromDate).format("ll")}
                    </div>
                    {" to "}
                    <div className="badge badge-dark">
                        {moment(searchToDate).format("ll")}
                    </div>
                </span>
            </h2>
            <div className="row mt-2">
                <div className="col-md-12">{getAnalyticData()}</div>
            </div>

            <h2 className="main-title mt-5">
                Funnel Tracking{" - "}
                <span className="searched-time-wrap">
                    <div className="badge badge-dark">
                        {moment(searchFromDate).format("ll")}
                    </div>
                    {" to "}
                    <div className="badge badge-dark">
                        {moment(searchToDate).format("ll")}
                    </div>
                </span>
            </h2>
            <div className="row mt-2">
                <div className="col-md-12">{getFunnelData()}</div>
            </div>

            <h2 className="mt-5 main-title">
                By Player View{" - "}
                <span className="searched-time-wrap">
                    <div className="badge badge-dark">
                        {moment(searchFromDate).format("ll")}
                    </div>
                    {" to "}
                    <div className="badge badge-dark">
                        {moment(searchToDate).format("ll")}
                    </div>
                </span>
            </h2>
            <div className="row by-player-result">
                {byPlayerReport.map((player: any) => {
                    return (
                        <ul className="main" key={player.playerId}>
                            <li className="main">
                                {" "}
                                <small className="text-dimmed">
                                    Player:{" "}
                                </small>{" "}
                                {player.playerId}
                            </li>
                            <ul className="sub">
                                {player.playerDayDetail.map(
                                    (detail: any, i) => {
                                        return (
                                            <React.Fragment key={i}>
                                                {detail.count ? (
                                                    <li>
                                                        {moment(
                                                            detail.day
                                                        ).format("ll")}
                                                        {
                                                            <span className="number">
                                                                {detail.count}
                                                            </span>
                                                        }
                                                    </li>
                                                ) : (
                                                    <></>
                                                )}
                                            </React.Fragment>
                                        );
                                    }
                                )}
                            </ul>
                        </ul>
                    );
                })}
            </div>
        </div>
    );
};

export default Dashboard;
