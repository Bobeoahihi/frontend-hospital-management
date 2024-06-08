import React, { Component, Fragment, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageClinics.scss'
import * as actions from "../../../store/actions";
import { compose } from 'redux';
import ReactPaginate from 'react-paginate'
import { getClinicPaginate } from '../../../services/userService';
class TableManageClinics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clinicList: [],
            currentPage: 1,
            currentLimit: 5,
            totalPages: 0,

        }
    }
    async componentDidMount() {
        // this.props.fetchAllClinic();
        this.fetchClinicPaginate()

    }
    fetchClinicPaginate = async (page) => {
        let response = await getClinicPaginate(page ? page : this.state.currentPage, this.state.currentLimit)
        if (response && response.data) {
            this.setState({
                totalPages: response.data.totalPages,
                clinicList: response.data.clinics
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.listClinics !== this.props.listClinics) {
        //     this.setState({
        //         clinicList: this.props.listClinics
        //     })
        // }
    }
    handleDeleteClinic = (clinic) => {
        this.props.deleteAClinic(clinic.id)
    }
    handleEditClinic = (clinics) => {
        this.props.handleEditClinicFromParentKey(clinics)
    }
    handlePageClick = async (event) => {
        this.setState({
            currentPage: +event.selected + 1,
        })
        await this.fetchClinicPaginate(+event.selected + 1)
    };
    render() {
        let { clinicList, totalPages } = this.state
        let { listClinics } = this.props
        return (
            <React.Fragment>
                <table id='TableManageClinics'>
                    <tbody>
                        <tr>
                            <th>Số thứ tự</th>
                            <th>Tên Cơ sở y tế</th>
                            <th>Địa chỉ</th>
                            {/* <th>Nội dung</th> */}
                            <th>Actions</th>
                        </tr>
                        {clinicList && clinicList.length > 0 &&
                            clinicList.map((item, index) => {
                                return (
                                    <tr key={index} >
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                        {/* <td>{item.descriptionMarkdown}</td> */}
                                        <td>
                                            <button className='btn-edit'
                                                onClick={() => this.handleEditClinic(item)}
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button className='btn-delete'
                                                onClick={() => this.handleDeleteClinic(item)}>
                                                <i className="far fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}

                    </tbody>
                </table>
                {totalPages &&
                    <div className='clinic-footer'>
                        <ReactPaginate


                            nextLabel="next >"
                            onPageChange={this.handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={totalPages}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    </div>
                }
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        listClinics: state.admin.clinics,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllClinic: () => dispatch(actions.fetchAllClinicStart()),
        deleteAClinic: (id) => dispatch(actions.deleteAClinic(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClinics);
