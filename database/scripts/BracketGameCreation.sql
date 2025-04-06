DO $$
DECLARE
    target_year integer := INSERT_YEAR_HERE;  -- Replace with desired year
BEGIN
    FOR game_num IN 1..63 LOOP
        INSERT INTO public."BracketGame" (year, game_number)
        VALUES (target_year, game_num);
    END LOOP;
END $$;
