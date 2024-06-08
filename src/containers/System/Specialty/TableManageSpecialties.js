import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageSpecialties.scss'
import * as actions from "../../../store/actions";
import { compose } from 'redux';
import './TableManageSpecialties.scss'
import ReactPaginate from 'react-paginate'
import { getSpecialtyPaginate } from '../../../services/userService';
class TableManageSpecialties extends Component {

    constructor(props) {
        super(props);
        this.state = {
            specialtyList: [],
            currentPage: 1,
            currentLimit: 5,
            totalPages: 0,
        }
    }
    componentDidMount() {
        this.props.fetchAllSpecialty();
        this.fetchClinicPaginate()
    }
    fetchClinicPaginate = async (page) => {
        let response = await getSpecialtyPaginate(page ? page : this.state.currentPage, this.state.currentLimit)
        if (response && response.data) {
            this.setState({
                totalPages: response.data.totalPages,
                specialtyList: response.data.specialties
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listSpecialties !== this.props.listSpecialties) {
            this.setState({
                specialtyList: this.props.listSpecialties
            })
        }
    }
    handleDeleteSpecialty = (specialty) => {
        this.props.deleteASpecialty(specialty.id)
    }
    handleEditSpecialty = (specialties) => {
        this.props.handleEditSpecialtyFromParentKey(specialties)
    }
    handlePageClick = async (event) => {
        this.setState({
            currentPage: +event.selected + 1,
        })
        await this.fetchClinicPaginate(+event.selected + 1)
    };

    render() {
        let { specialtyList, totalPages } = this.state
        let { listSpecialties } = this.props
        console.log('listSpecialties', listSpecialties)
        return (
            <React.Fragment>
                <table id='TableManageSpecialties'>
                    <tbody>
                        <tr>
                            <th>Số thứ tự</th>
                            <th>Tên chuyên khoa</th>
                            {/* <th>Nội dung</th> */}
                            <th>Actions</th>
                        </tr>
                        {specialtyList && specialtyList.length > 0 &&
                            specialtyList.map((item, index) => {
                                return (
                                    <tr key={index} >
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        {/* <td>{item.descriptionMarkdown}</td> */}
                                        <td>
                                            <button className='btn-edit'
                                                onClick={() => this.handleEditSpecialty(item)}
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button className='btn-delete'
                                                onClick={() => this.handleDeleteSpecialty(item)}>
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
        listSpecialties: state.admin.specialties,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialtyStart()),
        deleteASpecialty: (id) => dispatch(actions.deleteASpecialty(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageSpecialties);
