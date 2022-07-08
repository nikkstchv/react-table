import React, { Component } from "react";
import _ from "lodash";
import ReactPaginate from "react-paginate";
import Table from "./Table/Table";
import DetailRowView from "./DetailRowView/DetailRowView";
import TableSearch from "./TableSearch/TableSearch";
import dataJson from "./data/data.json";


class App extends Component {
  state = {
    isLoading: true,
    isModeSelected: false,
    data: [...dataJson],
    search: '',
    sort: "asc", // desk
    sortField: "id",
    row: null,
    currentPage: 0
  };

  onRowSelect = (row) => {
    this.setState({ row });
  };

  pageChangeHandler = ({ selected }) => {
    this.setState({ currentPage: selected });
  }

  onSort = (sortField) => {
    const clonedData = this.state.data.concat();
    const sort = this.state.sort === "asc" ? "desc" : "asc";
    const data = _.orderBy(clonedData, sortField, sort);
    this.setState({ data, sort, sortField });
  };

  modeSelectHandler = (url) => {
    this.setState({
      isModeSelected: true,
    });
    this.fetchData(url);
  };

  searchHandler = search => {
    this.setState({ search, currentPage: 0 })
  }

  getFilteredData() {
    const { data, search } = this.state;

    if (!search) {
      return data;
    }
    return data.filter(item => {
      return item['account']['name'].toLowerCase().includes(search.toLowerCase())
        || item['terminal']['name'].toLowerCase().includes(search.toLowerCase())
        || item['created_user']['surname'].toLowerCase().includes(search.toLowerCase())
        || item['created_user']['namejj'].toLowerCase().includes(search.toLowerCase())
    })
  }

  render() {
    const pageSize = 10;

    const filteredData = this.getFilteredData();

    const pageCount = Math.ceil(filteredData.length / pageSize);

    const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage]

    return (
      <div className="container">
        <React.Fragment>
          <TableSearch onSearch={this.searchHandler} />
          <Table
            data={displayData}
            onSort={this.onSort}
            sort={this.state.sort}
            sortFied={this.state.sortField}
            onRowSelect={this.onRowSelect}
          />
        </React.Fragment>

        {this.state.data.length > pageSize ? (
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.pageChangeHandler}
            containerClassName={"pagination justify-content-center"}
            activeClassName={"active"}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            nextClassName="page-item"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            forcePage={this.state.currentPage}
          />
        ) : null}

        {this.state.row ? <DetailRowView item={this.state.row} /> : null}
      </div>
    );
  }
}

export default App;
