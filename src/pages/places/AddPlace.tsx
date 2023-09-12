import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import Container from '../../components/container/Container';
import MainHeading from '../../components/heading/Heading';
import { useEffect, useState } from 'react';
import { getAreas, getCategories } from '../../services/codestable-service';
import {
  CodeDecodeArea,
  CodeDecodeCategory,
  CodeDecodeSubCategory,
} from '../../model/code-decode';
import { PlaceRequestDto } from '../../dto/place-dto';
import { addNewPlaceRequest } from '../../services/place-service';
import useAlert from '../../hooks/useAlert';
import Alert, { ALERT_TYPE } from '../../components/alert/Alert';

const AddPlace = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [placeName, setPlaceName] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState<number | undefined>();
  const [category, setCategory] = useState<number | undefined>();
  const [subCategory, setSubCategory] = useState<number | undefined>();
  const [description, setDescription] = useState('');
  const [categoryDropDownList, setCategoryDropDownList] = useState<
    CodeDecodeCategory[]
  >([]);
  const [subCategoryDropDownList, setSubCategoryDropDownList] = useState<
    CodeDecodeSubCategory[]
  >([]);
  const [areasDropDownList, setAreasDropDownList] = useState<CodeDecodeArea[]>(
    []
  );

  const { alertType, alertHeader, alertDescription, displayAlert, resetAlert } =
    useAlert();

  const navigate = useNavigate();
  const onSubmitClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetAlert();

    const newPlace = {
      placeName: placeName,
      address: address,
      area: area!,
      sub_category: subCategory!,
      description: description,
    } as PlaceRequestDto;

    try {
      await addNewPlaceRequest(newPlace);
      navigate(ROUTES.LANDING_PAGE);
    } catch (err) {
      // Handle error
      displayAlert(
        ALERT_TYPE.ERROR,
        'Sorry, there was an issue submitting your request. Please try again later.',
        `${err}`
      );
    }
  };

  const onCancelClick = () => {
    resetAlert();
    navigate(ROUTES.LANDING_PAGE);
  };

  useEffect(() => {
    Promise.all([getCategories(), getAreas()])
      .then(([categories, areas]) => {
        setCategoryDropDownList(
          categories.sort((c1, c2) => c1.decode.localeCompare(c2.decode))
        );
        setAreasDropDownList(
          areas.sort((a1, a2) => a1.decode.localeCompare(a2.decode))
        );
      })
      .catch((err) => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setSubCategory(undefined);

    setSubCategoryDropDownList(
      categoryDropDownList.find((list) => list.code === category)
        ?.subCategories ?? []
    );
  }, [category, categoryDropDownList]);

  return (
    <div className="bg-gray-background space-y-8 mt-8">
      <Container>
        <form
          className="space-y-8 divide-y divide-gray-200"
          onSubmit={onSubmitClick}
        >
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div className="space-y-6 sm:space-y-5">
              <div>
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  <MainHeading>Add New Place</MainHeading>
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Create a new itinerary destination by filling out the details
                  of your desired location, including its name, address, and
                  description.
                </p>
              </div>

              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="placeName"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Place Name
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <input
                      type="text"
                      name="placeName"
                      id="placeName"
                      autoComplete="placeName"
                      value={placeName}
                      onChange={(e) => setPlaceName(e.target.value)}
                      required
                      className="block py-2 px-3.5 w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Address
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      autoComplete="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      className="block py-2 px-3.5 w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="area"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Area
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <select
                      id="area"
                      name="area"
                      placeholder="Select"
                      value={area || ''}
                      onChange={(e) => setArea(+e.target.value)}
                      autoComplete="area"
                      required
                      className="block py-2 px-3.5 w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="" disabled>
                        Select an area...
                      </option>
                      {areasDropDownList.map((area) => (
                        <option key={area.id} value={area.code}>
                          {area.decode}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Category
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <select
                      id="category"
                      name="category"
                      value={category || ''}
                      onChange={(e) => setCategory(+e.target.value)}
                      autoComplete="category"
                      required
                      className="block py-2 px-3.5 w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="" disabled>
                        Select a category...
                      </option>
                      {categoryDropDownList.map((category) => (
                        <option key={category.id} value={category.code}>
                          {category.decode}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="subCategory"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Sub-Category
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <select
                      id="subCategory"
                      name="subCategory"
                      placeholder="Select"
                      value={subCategory || ''}
                      onChange={(e) => setSubCategory(+e.target.value)}
                      autoComplete="subCategory"
                      required
                      className="block py-2 px-3.5 w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="" disabled>
                        Select a sub-category...
                      </option>
                      {subCategoryDropDownList.map((subcategory) => (
                        <option key={subcategory.id} value={subcategory.code}>
                          {subcategory.decode}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Todo: Add number of characters left */}
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Location Description
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <textarea
                      id="description"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      required
                      className="block py-2 px-3.5 w-full max-w-lg rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                {/* <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Location photo
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="pt-5 space-y-5">
            {alertType && (
              <Alert
                alertType={alertType}
                alertHeader={alertHeader ?? ''}
                alertDescription={alertDescription ?? ''}
              />
            )}
            <div className="flex justify-end gap-x-3">
              <button
                type="button"
                className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={onCancelClick}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default AddPlace;
