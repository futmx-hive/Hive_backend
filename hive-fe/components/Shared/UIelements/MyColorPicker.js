import React, {useState, useMemo} from 'react';
import {CustomPicker} from 'react-color';
import {
  Alpha,
  EditableInput,
  Saturation,
  Hue,
} from 'react-color/lib/components/common';
import Field from '../Form/Field';
import UseForm from '../../../formconfigs/UseForm';
import * as Yup from 'yup';
const tiny = require ('tinycolor2');
const pointerStyles = {
  width: '19px',
  height: '19px',
  borderRadius: '50%',
  border: '2px solid #fff',
  boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)',
};
const inputStyles = {
  wrap: {
    display: 'grid',
    gridTemplateColumns: '65% 35%',
    gap: '9px',
    fontFamily: 'Rubik',
  },
  input: {
    position: 'static',
    border: '1px solid #e5e5e5',
    fontSize: '1.6rem',
    padding: '.8rem 1rem',
    borderRadius: '5px',
  },
  label: {
    position: 'static',
    order: 1,
    fontSize: '1.6rem',
    borderRadius: '5px',
    padding: '.8rem 1rem',
    backgroundColor: '#',
    color: 'transparent',
  },
};

const styleEx = {
  height: '16px',
  position: 'relative',
};

const initialState = {
  fields: {
    name: '',
  },
};

const MyColorPicker = ({close, colors, add, ...props}) => {
  const col = tiny ('#A04A4AFF');
  const colorSchema = useMemo (
    () =>
      Yup.object ().shape ({
        name: Yup.string ()
          .required ('please specify color name')
          .matches (/^(\w+?\s?){1,}$/, 'special characters are not allowed')
          .test (
            'is-soko-category',
            'color name not acceptable!',
            v => !/\bsoko\b/i.test (v)
          )
          .test (
            'exists',
            'this color name alredy exists',
            v => !colors.find (({name}) => name === v.toLowerCase ())
          )
          .required ('please choose a color name'),
      }),
    [colors]
  );
  const {formIsValid, values, onChange, errors} = UseForm (
    initialState,
    colorSchema
  );
  const [color, setColor] = useState (col);
  const hc = (color, e) => {
    setColor (tiny (color));
    // console.log (tiny (color));
    props.onChange (tiny (color).toHexString ());
  };
  const saveColor = () => {
    add ({
      ...values,
      color: color.toHex8String (),
    });
    close ();
  };
  const h = color.toHsl ();
  const hslStr = `hsla(${h.h},${h.s * 100}%,${h.l * 100}%,${h.a})`;
  return (
    <div
      className="card pos-r grid_txt_1 bord-g-1"
      id="force"
      style={{width: '28rem', position: 'relative'}}
    >
      <div className="mb-1">
        <Field
          placeholder="color name"
          name="name"
          value={values['name']}
          handleChange={onChange}
          error={errors['name']}
        />
      </div>
      <div
        className="pos-r"
        style={{
          height: '22.7rem',
          position: 'relative',
        }}
      >
        <Saturation
          {...props}
          pointer={Y}
          onChange={hc}
          hsl={color.toHsl ()}
          hsv={color.toHsv ()}
          width={150}
        />
      </div>
      <div className="pos-r" style={styleEx}>
        <Alpha
          {...props}
          onChange={e => {
            hc ({...color._originalInput, a: e.a});
          }}
          pointer={X}
          width={'150'}
          rgb={color.toPercentageRgb ()}
        />
      </div>

      <div style={styleEx}>
        <Hue
          {...props}
          direction={'horizontal'}
          pointer={X}
          onChange={hc}
          hsl={color.toHsl ()}
          hsv={color.toHsv ()}
          width={150}
        />

      </div>
      <div style={{position: 'relative'}}>
        <EditableInput
          style={{
            ...inputStyles,
            label: {
              ...inputStyles.label,
              backgroundColor: hslStr,
            },
          }}
          label={`.`}
          value={color.toHex8String ()}
          onChange={col => {
            const color = Object.values (col)[0];
            hc (color);
          }}
        />
      </div>
      <div
        className="button_box"
        style={{
          display: 'grid',
          gridTemplateColumns: '40% 40% 20%',
        }}
      >
        <button
          className="btn_blue btn_med heading_small_1"
          type="button"
          onClick={saveColor}
          disabled={!formIsValid}
        >
          save
        </button>
        <button
          className="bg-b-l br btn_med col-b heading_small_1"
          onClick={close}
        >
          cancel
        </button>
      </div>
    </div>
  );
};

function X () {
  return <div style={pointerStyles} />;
}
function Y () {
  return (
    <div
      style={{
        ...pointerStyles,
        width: '15px',
        height: '15px',
        border: '1px solid #fff',
      }}
    />
  );
}

export default CustomPicker (MyColorPicker);
