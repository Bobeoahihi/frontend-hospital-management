import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { LANGUAGE } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions'
import Select from 'react-select';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkSpecialtyClinic } from '../../../services/userService';
import './ChooseSpecialty.scss'
class ChooseSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listClinics: [],
            selectedClinics: {},
            listSpecialty: []
        }
    }
    async componentDidMount() {
        this.props.fetchAllClinic();
        this.props.fetchAllSpecialty();
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (prevProps.allClinics !== this.props.allClinics) {
            let dataSelect = this.buildDataInputSelect(this.props.allClinics)
            this.setState({
                listClinics: dataSelect
            })
        }
        if (prevProps.allSpecialties !== this.props.allSpecialties) {
            let data = this.props.allSpecialties;
            console.log('data', data)
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                listSpecialty: data
            })
        }
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.label = item.name;
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }
    handleClickBtnSpecialty = (specialty) => {
        let { listSpecialty } = this.state
        if (listSpecialty && listSpecialty.length > 0) {
            listSpecialty = listSpecialty.map(item => {
                if (item.id === specialty.id) item.isSelected = !item.isSelected
                return item
            })
            this.setState({
                listSpecialty: listSpecialty
            })
        }
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedClinics: selectedOption });
    }
    handleChangeSpecialty = async () => {
        let { listSpecialty, selectedClinics } = this.state
        let result = []
        if (selectedClinics && _.isEmpty(selectedClinics)) {
            toast.error('Invalid clinic')
            return;
        }
        if (listSpecialty && listSpecialty.length > 0) {
            let selectedSpecialty = listSpecialty.filter(item => item.isSelected === true)
            if (selectedSpecialty && selectedSpecialty.length > 0) {
                selectedSpecialty.map(specialty => {
                    let object = {};
                    object.clinicId = selectedClinics.value;
                    object.specialtyId = specialty.id;
                    result.push(object)
                })
            } else {
                toast.error('Invalid selected specialty!')
                return;
            }
        }
        let res = await saveBulkSpecialtyClinic({
            arrSpecialty: result,
            clinicId: selectedClinics.value,
        })
        if (res && res.errCode === 0) {
            toast.success('save specialty success')
        } else {
            toast.error('error saveBulkSpecialty')
            console.log('error saveBulkSpecialty', res)
        }

    }

    render() {
        let { listSpecialty } = this.state
        console.log('listSpecialty', listSpecialty)
        return (
            <React.Fragment>

                <div className='manage-schedule-container'>
                    <div className='m-s-title'>
                        Thêm chuyên khoa khám bệnh
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Chọn cơ sở y tế</label>
                                <Select
                                    value={this.state.selectedClinics}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listClinics}
                                    className='select'
                                />
                            </div>
                            <div className='col-12 pick-hour-container'>
                                {listSpecialty && listSpecialty.length > 0 &&
                                    listSpecialty.map((item, index) => {
                                        return (
                                            <button className={item.isSelected === true
                                                ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                                key={index}
                                                onClick={() => this.handleClickBtnSpecialty(item)}>
                                                {item.name}
                                            </button>
                                        )
                                    })}
                            </div>
                            <div className='col-12'>
                                <button className='btn btn-primary btn-save-schedule'
                                    onClick={() => this.handleChangeSpecialty()}>
                                    <FormattedMessage id="manage-schedule.save" />
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allClinics: state.admin.clinics,
        allSpecialties: state.admin.specialties,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllClinic: () => dispatch(actions.fetchAllClinicStart()),
        fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialtyStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseSpecialty);
